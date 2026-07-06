import type { DbSnapshot } from './persistence';

export const seeds: DbSnapshot = {
  schools: [
    {
      id: '1',
      name: 'EMEF Monteiro Lobato',
      address: 'Rua das Palmeiras, 45 - Centro',
      createdAt: '2026-02-10T12:00:00.000Z',
    },
    {
      id: '2',
      name: 'EMEF Cora Coralina',
      address: 'Av. Brasil, 1200 - Jardim América',
      createdAt: '2026-02-12T12:00:00.000Z',
    },
    {
      id: '3',
      name: 'EMEI Vinícius de Moraes',
      address: 'Rua Ipê Amarelo, 88 - Vila Nova',
      createdAt: '2026-03-01T12:00:00.000Z',
    },
    {
      id: '4',
      name: 'EMEF Professora Ana Ribeiro',
      address: 'Travessa São José, 15 - Bela Vista',
      createdAt: '2026-03-15T12:00:00.000Z',
    },
  ],
  classes: [
    { id: '1', name: '1º Ano A', shift: 'morning', year: 2026, schoolId: '1' },
    { id: '2', name: '1º Ano B', shift: 'afternoon', year: 2026, schoolId: '1' },
    { id: '3', name: '2º Ano A', shift: 'morning', year: 2026, schoolId: '1' },
    { id: '4', name: '3º Ano A', shift: 'full_time', year: 2026, schoolId: '2' },
    { id: '5', name: '4º Ano A', shift: 'morning', year: 2026, schoolId: '2' },
    { id: '6', name: 'Maternal II', shift: 'morning', year: 2026, schoolId: '3' },
    { id: '7', name: 'Jardim I', shift: 'afternoon', year: 2026, schoolId: '3' },
    { id: '8', name: 'EJA - Módulo 1', shift: 'evening', year: 2026, schoolId: '4' },
  ],
};
