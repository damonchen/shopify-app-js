import * as fs from 'fs/promises';

import {Session} from '@shopify/shopify-api';
import {batteryOfTests} from '@shopify/shopify-app-session-storage-test-utils';
import sqlite3 from 'sqlite3';

import {SQLiteSessionStorage} from '../sqlite';

describe('SQLiteSessionStorage', () => {
  const sqliteDbFile = './sqlite.testDb';
  let storage: SQLiteSessionStorage;

  beforeAll(async () => {
    await fs.rm(sqliteDbFile, {force: true});
  });

  afterAll(async () => {
    await fs.rm(sqliteDbFile, {force: true});
  });

  describe('with string constructor', () => {
    beforeEach(async () => {
      storage = new SQLiteSessionStorage(sqliteDbFile);
    });

    batteryOfTests(async () => storage);
  });

  describe('with database constructor', () => {
    beforeEach(async () => {
      storage = new SQLiteSessionStorage(new sqlite3.Database(sqliteDbFile));
    });

    batteryOfTests(async () => storage);
  });
});
