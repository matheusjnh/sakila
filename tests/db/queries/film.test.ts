import { category, film, filmCategory } from '@src/db/schema';
import { closeCtx, DbCtx, setupDb } from '@tests/db/setup';
import { sql } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('film queries', () => {
  let ctx: DbCtx;

  beforeAll(async () => {
    ctx = await setupDb();
  });

  afterAll(async () => {
    closeCtx(ctx);
  });

  beforeEach(async () => {
    const { db } = ctx;
    db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);
    db.execute(sql`TRUNCATE ${category};`);
    db.execute(sql`TRUNCATE ${filmCategory};`);
    db.execute(sql`TRUNCATE ${film};`);
    db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
  });

  it('should pass', async () => {
    const { db } = ctx;

    const [categoryInsert] = await db.insert(category).values({
      name: 'cat',
    });
    const id = categoryInsert.insertId;

    const result = await db.select().from(category);
    const [row] = result;

    expect(result.length).toBe(1);
    expect(row.categoryId).toBe(id);
    expect(row.name).toBe('cat');
  });
});
