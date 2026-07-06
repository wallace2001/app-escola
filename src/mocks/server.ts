import { createServer, Response } from 'miragejs';
import type { ZodError } from 'zod';
import { z } from 'zod';

import { schoolSchema } from '@/domain/school';
import { schoolClassSchema } from '@/domain/school-class';
import { API_URL } from '@/lib/http';

import type { DbSnapshot } from './persistence';
import { loadSnapshot, schedulePersist } from './persistence';
import { seeds } from './seeds';

type MockServer = ReturnType<typeof createServer>;

declare global {
  // eslint-disable-next-line no-var
  var __mockApiServer: MockServer | undefined;
}

const createClassSchema = schoolClassSchema.extend({
  schoolId: z.string('Informe a escola da turma').min(1, 'Informe a escola da turma'),
});

function parseBody(requestBody: string): unknown {
  try {
    return JSON.parse(requestBody);
  } catch {
    return null;
  }
}

function unprocessable(error: ZodError) {
  return new Response(
    422,
    {},
    {
      message: error.issues[0]?.message ?? 'Dados inválidos.',
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    },
  );
}

function notFound(message: string) {
  return new Response(404, {}, { message });
}

export async function startMockServer(): Promise<MockServer> {
  globalThis.__mockApiServer?.shutdown();

  const snapshot = await loadSnapshot();

  const server = createServer({
    logging: false,

    routes() {
      this.urlPrefix = API_URL;
      this.timing = 350;

      const persist = () => schedulePersist(() => server.db.dump() as unknown as DbSnapshot);

      const serializeSchool = (school: { id: string | number }) => ({
        ...school,
        id: String(school.id),
        classesCount: server.db.classes.where({ schoolId: String(school.id) }).length,
      });

      const serializeClass = (schoolClass: { id: string | number }) => ({
        ...schoolClass,
        id: String(schoolClass.id),
      });

      this.get('/schools', (schema, request) => {
        const search = String(request.queryParams.q ?? '')
          .trim()
          .toLowerCase();

        return schema.db.schools
          .where(
            (school: { name: string; address: string }) =>
              !search ||
              school.name.toLowerCase().includes(search) ||
              school.address.toLowerCase().includes(search),
          )
          .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
          .map(serializeSchool);
      });

      this.get('/schools/:id', (schema, request) => {
        const school = schema.db.schools.find(request.params.id);
        if (!school) return notFound('Escola não encontrada.');

        return serializeSchool(school);
      });

      this.post('/schools', (schema, request) => {
        const result = schoolSchema.safeParse(parseBody(request.requestBody));
        if (!result.success) return unprocessable(result.error);

        const school = schema.db.schools.insert({
          ...result.data,
          createdAt: new Date().toISOString(),
        });

        persist();
        return new Response(201, {}, serializeSchool(school));
      });

      this.put('/schools/:id', (schema, request) => {
        const school = schema.db.schools.find(request.params.id);
        if (!school) return notFound('Escola não encontrada.');

        const result = schoolSchema.safeParse(parseBody(request.requestBody));
        if (!result.success) return unprocessable(result.error);

        const updated = schema.db.schools.update(request.params.id, result.data);

        persist();
        return serializeSchool(updated);
      });

      this.delete('/schools/:id', (schema, request) => {
        const school = schema.db.schools.find(request.params.id);
        if (!school) return notFound('Escola não encontrada.');

        schema.db.classes.remove({ schoolId: String(school.id) });
        schema.db.schools.remove(request.params.id);

        persist();
        return new Response(204);
      });

      this.get('/classes', (schema, request) => {
        const schoolId = String(request.queryParams.schoolId ?? '').trim();
        const shift = String(request.queryParams.shift ?? '').trim();
        const search = String(request.queryParams.q ?? '')
          .trim()
          .toLowerCase();

        return schema.db.classes
          .where(
            (schoolClass: { name: string; shift: string; schoolId: string }) =>
              (!schoolId || String(schoolClass.schoolId) === schoolId) &&
              (!shift || schoolClass.shift === shift) &&
              (!search || schoolClass.name.toLowerCase().includes(search)),
          )
          .sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name, 'pt-BR', { numeric: true }),
          )
          .map(serializeClass);
      });

      this.get('/classes/:id', (schema, request) => {
        const schoolClass = schema.db.classes.find(request.params.id);
        if (!schoolClass) return notFound('Turma não encontrada.');

        return serializeClass(schoolClass);
      });

      this.post('/classes', (schema, request) => {
        const result = createClassSchema.safeParse(parseBody(request.requestBody));
        if (!result.success) return unprocessable(result.error);

        const school = schema.db.schools.find(result.data.schoolId);
        if (!school) return notFound('Escola não encontrada.');

        const schoolClass = schema.db.classes.insert(result.data);

        persist();
        return new Response(201, {}, serializeClass(schoolClass));
      });

      this.put('/classes/:id', (schema, request) => {
        const schoolClass = schema.db.classes.find(request.params.id);
        if (!schoolClass) return notFound('Turma não encontrada.');

        const result = schoolClassSchema.safeParse(parseBody(request.requestBody));
        if (!result.success) return unprocessable(result.error);

        const updated = schema.db.classes.update(request.params.id, result.data);

        persist();
        return serializeClass(updated);
      });

      this.delete('/classes/:id', (schema, request) => {
        const schoolClass = schema.db.classes.find(request.params.id);
        if (!schoolClass) return notFound('Turma não encontrada.');

        schema.db.classes.remove(request.params.id);

        persist();
        return new Response(204);
      });

      // requisições fora da API mock (Metro, source maps, etc.) seguem normalmente
      this.passthrough((request) => !request.url.startsWith(API_URL));
    },
  });

  server.db.loadData(snapshot ?? seeds);

  globalThis.__mockApiServer = server;
  return server;
}
