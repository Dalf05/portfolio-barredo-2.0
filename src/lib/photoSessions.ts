// BMW 135i M Session images
import bmw1 from '@/assets/bmw-135i/bmw-1.jpg';
import bmw2 from '@/assets/bmw-135i/bmw-2.jpg';
import bmw3 from '@/assets/bmw-135i/bmw-3.jpg';
import bmw4 from '@/assets/bmw-135i/bmw-4.jpg';
import bmw5 from '@/assets/bmw-135i/bmw-5.jpg';
import bmw6 from '@/assets/bmw-135i/bmw-6.jpg';
import bmw7 from '@/assets/bmw-135i/bmw-7.jpg';
import bmw8 from '@/assets/bmw-135i/bmw-8.jpg';
import bmw9 from '@/assets/bmw-135i/bmw-9.jpg';

export interface PhotoSession {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
}

export const photoSessions: PhotoSession[] = [
  {
    id: 'bmw-135i-m',
    title: 'SESIÓN BMW 135i M',
    coverImage: bmw5, // Horizontal image for cover
    images: [bmw1, bmw2, bmw3, bmw4, bmw5, bmw6, bmw7, bmw8, bmw9]
  },
  {
    id: 'prueba-1',
    title: '22/12/2025',
    coverImage: '',
    images: []
  },
  {
    id: 'prueba-2',
    title: '23/12/2025',
    coverImage: '',
    images: []
  }
];

export const getSessionById = (id: string): PhotoSession | undefined => {
  return photoSessions.find(session => session.id === id);
};
