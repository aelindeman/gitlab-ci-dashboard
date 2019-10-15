const validRegex = /^#(?:;*([^=;]+)=([^=;]*);+)*(?:;*([^=;]+)=([^=;]*);*)$/;

const defaultSource = window.location.hash;

const all = (source = defaultSource): { [key: string]: string } =>
  source
    .substring(1)
    .split(";")
    .filter(it => it.length > 0)
    .map(it => it.split("=", 2))
    .filter(([key]) => key.length > 0)
    .reduce((map, [key, value]) => ({ ...map, [key]: value }), {});

const get = (key: string, fallback = "", source = defaultSource): string =>
  all(source)[key] || fallback;

const keys = (source = defaultSource): string[] => Object.keys(all(source));

const valid = (source = defaultSource): boolean =>
  source.match(validRegex) !== null;

export default {
  all,
  get,
  keys,
  valid,
};
