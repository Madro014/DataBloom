export const KEY = "databloom.progress.v1";

export function sanitize(value, lessons) {
  const source =
    value && typeof value === "object" ? value : {};

  const ids = new Set(
    Array.isArray(source.done) ? source.done : []
  );

  const done = [];

  // Solo acepta lecciones consecutivas desde el inicio.
  for (const lesson of lessons) {
    if (!ids.has(lesson.id)) break;
    done.push(lesson.id);
  }

  return {
    version: 1,
    name:
      typeof source.name === "string"
        ? source.name.slice(0, 35)
        : "",
    done
  };
}

export function unlock(lessons, done, id) {
  const index = lessons.findIndex(
    lesson => lesson.id === id
  );

  return (
    index >= 0 &&
    lessons
      .slice(0, index)
      .every(lesson => done.includes(lesson.id))
  );
}

export function complete(state, lessons, id) {
  if (
    state.done.includes(id) ||
    !unlock(lessons, state.done, id)
  ) {
    return state;
  }

  return {
    ...state,
    done: [...state.done, id]
  };
}

export function earned(routes, lessons, done) {
  return routes.filter(route => {
    const group = lessons.filter(
      lesson => lesson.route === route.id
    );

    return (
      group.length > 0 &&
      group.every(lesson => done.includes(lesson.id))
    );
  });
}

export function normalize(text) {
  return String(text).replace(/\r/g, "").trim();
}