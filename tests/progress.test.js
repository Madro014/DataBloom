import test from "node:test";
import assert from "node:assert/strict";

import {
  sanitize,
  unlock,
  complete,
  earned,
  normalize
} from "../src/progress.js";

import {
  lessons,
  routes
} from "../src/curriculum.js";

test("no permite saltos ni puntos duplicados", () => {
  const empty = sanitize(null, lessons);

  assert.equal(
    unlock(lessons, [], lessons[1].id),
    false
  );

  assert.deepEqual(
    complete(empty, lessons, lessons[1].id),
    empty
  );

  const one = complete(
    empty,
    lessons,
    lessons[0].id
  );

  assert.equal(one.done.length, 1);

  assert.deepEqual(
    complete(one, lessons, lessons[0].id),
    one
  );

  assert.equal(
    unlock(lessons, one.done, lessons[1].id),
    true
  );
});

test("sanea datos recuperados", () => {
  assert.deepEqual(
    sanitize(
      { done: ["fantasma", lessons[2].id] },
      lessons
    ).done,
    []
  );

  assert.deepEqual(
    sanitize(
      { done: [lessons[0].id, lessons[0].id] },
      lessons
    ).done,
    [lessons[0].id]
  );

  assert.equal(
    sanitize({ name: 42, done: null }, lessons).name,
    ""
  );
});

test("medallas solo al completar una etapa", () => {
  const logic = lessons
    .filter(lesson => lesson.route === "logic")
    .map(lesson => lesson.id);

  assert.equal(
    earned(routes, lessons, logic.slice(0, -1)).length,
    0
  );

  assert.equal(
    earned(routes, lessons, logic).length,
    1
  );

  assert.equal(
    earned(
      routes,
      lessons,
      lessons.map(lesson => lesson.id)
    ).length,
    4
  );
});

test("currículo completo y coherente", () => {
  assert.equal(lessons.length, 28);

  assert.equal(
    new Set(lessons.map(lesson => lesson.id)).size,
    28
  );

  for (const lesson of lessons) {
    assert.ok(
      routes.some(route => route.id === lesson.route)
    );

    assert.ok(
      lesson.theory.length >= 2 &&
      lesson.prompt &&
      lesson.hint
    );

    if (lesson.type === "quiz") {
      assert.ok(lesson.options[lesson.answer]);
    } else {
      assert.ok(lesson.solution);
      assert.ok(lesson.expected);
    }
  }

  assert.equal(normalize("Hola\r\n"), "Hola");
});