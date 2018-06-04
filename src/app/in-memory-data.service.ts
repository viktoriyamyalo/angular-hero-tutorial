import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      const heroes = [
      { id: 2, name: 'Batman' },
      { id: 3, name: 'Dr. Horrible' },
      { id: 4, name: 'Superman' },
      { id: 5, name: 'Superwoman' },
      { id: 6, name: 'Narco'}];

      return {heroes};
    }
  }

