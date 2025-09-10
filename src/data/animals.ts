import { Animal } from '@/lib/types';
import catImage from '@/assets/animals/cat.jpg';
import dogImage from '@/assets/animals/dog.jpg';
import parrotImage from '@/assets/animals/parrot.jpg';
import rabbitImage from '@/assets/animals/rabbit.jpg';
import turtleImage from '@/assets/animals/turtle.jpg';
import giraffeImage from '@/assets/animals/giraffe.jpg';
import lionImage from '@/assets/animals/lion.jpg';
import elephantImage from '@/assets/animals/elephant.jpg';

export const animals: Animal[] = [
  {
    id: '1',
    namn: 'Katt',
    slug: 'katt',
    kategori: 'normal',
    kortBeskrivning: 'En mjuk och mysig husdjurskatt som älskar att gosa och leka.',
    pris: { S: 499, M: 799, L: 1199 },
    lager: { S: 8, M: 5, L: 3 },
    bildUrl: catImage
  },
  {
    id: '2',
    namn: 'Hund',
    slug: 'hund',
    kategori: 'normal',
    kortBeskrivning: 'En trogen följeslagare som älskar långa promenader och lek.',
    pris: { S: 699, M: 999, L: 1499 },
    lager: { S: 6, M: 4, L: 2 },
    bildUrl: dogImage
  },
  {
    id: '3',
    namn: 'Papegoja',
    slug: 'papegoja',
    kategori: 'exotisk',
    kortBeskrivning: 'En intelligent och färgglad fågel som kan lära sig prata.',
    pris: { S: 2499, M: 3999, L: 5999 },
    lager: { S: 3, M: 2, L: 1 },
    bildUrl: parrotImage
  },
  {
    id: '4',
    namn: 'Kanin',
    slug: 'kanin',
    kategori: 'normal',
    kortBeskrivning: 'En gullig och lekfull kanin som älskar morötter och hopp.',
    pris: { S: 299, M: 499, L: 799 },
    lager: { S: 10, M: 7, L: 4 },
    bildUrl: rabbitImage
  },
  {
    id: '5',
    namn: 'Sköldpadda',
    slug: 'skoldpadda',
    kategori: 'exotisk',
    kortBeskrivning: 'En lugn och långsam reptil som kan leva i många år.',
    pris: { S: 1299, M: 1999, L: 2999 },
    lager: { S: 4, M: 3, L: 2 },
    bildUrl: turtleImage
  },
  {
    id: '6',
    namn: 'Giraff',
    slug: 'giraff',
    kategori: 'exotisk',
    kortBeskrivning: 'Ett majestätiskt djur med lång hals som når högt upp.',
    pris: { S: 15999, M: 25999, L: 39999 },
    lager: { S: 1, M: 1, L: 0 },
    bildUrl: giraffeImage
  },
  {
    id: '7',
    namn: 'Lejon',
    slug: 'lejon',
    kategori: 'exotisk',
    kortBeskrivning: 'Djungelns kung med en mäktig man och kraftfull kropp.',
    pris: { S: 19999, M: 29999, L: 49999 },
    lager: { S: 1, M: 0, L: 1 },
    bildUrl: lionImage
  },
  {
    id: '8',
    namn: 'Elefant',
    slug: 'elefant',
    kategori: 'exotisk',
    kortBeskrivning: 'En intelligent jätte med fantastiskt minne och känsla.',
    pris: { S: 29999, M: 49999, L: 79999 },
    lager: { S: 1, M: 1, L: 1 },
    bildUrl: elephantImage
  }
];