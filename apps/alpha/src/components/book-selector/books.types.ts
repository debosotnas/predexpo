export interface IBook {
  id: number;
  name: string;
  abbr: string;
}

const NT_BOOKS: IBook[] = [
  { id: 40, name: 'Mateo', abbr: 'Mt.' },
  { id: 41, name: 'Marcos', abbr: 'Mc.' },
  { id: 42, name: 'Lucas', abbr: 'Mc.' },
  { id: 43, name: 'Juan', abbr: 'Mc.' },
  { id: 44, name: 'Hechos', abbr: 'Mc.' },
  { id: 45, name: 'Romanos', abbr: 'Mc.' },
  { id: 46, name: '1 Corintios', abbr: 'Mc.' },
  { id: 47, name: '2 Corintios', abbr: 'Mc.' },
  { id: 48, name: 'Gálatas', abbr: 'Mc.' },
  { id: 49, name: 'Efesios', abbr: 'Mc.' },
  { id: 50, name: 'Filipenses', abbr: 'Mc.' },
  { id: 51, name: 'Colosenses', abbr: 'Mc.' },
  { id: 52, name: '1 Tesalonicenses', abbr: 'Mc.' },
  { id: 53, name: '2 Tesalonicenses', abbr: 'Mc.' },
  { id: 54, name: '1 Timoteo', abbr: '1 Tim.' },
  { id: 55, name: '2 Timoteo', abbr: '2 Tim.' },
  { id: 56, name: 'Tito', abbr: 'Mc.' },
  { id: 57, name: 'Filemón', abbr: 'Mc.' },
  { id: 58, name: 'Hebreos', abbr: 'Mc.' },
  { id: 59, name: 'Santiago', abbr: 'Mc.' },
  { id: 60, name: '1 Pedro', abbr: 'Mc.' },
  { id: 61, name: '2 Pedro', abbr: 'Mc.' },
  { id: 62, name: '1 Juan', abbr: 'Mc.' },
  { id: 63, name: '2 Juan', abbr: 'Mc.' },
  { id: 64, name: '3 Juan', abbr: 'Mc.' },
  { id: 65, name: 'Judas', abbr: 'Mc.' },
  { id: 66, name: 'Apocalipsis', abbr: 'Mc.' },
];

export { NT_BOOKS };
