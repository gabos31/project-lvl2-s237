import fs from 'fs';
import { extname } from 'path';
import { safeLoad } from 'js-yaml';
import ini from 'ini';
import * as renderers from './renderers';
import parse from './parsers';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
  '.ini': ini.parse,
};

const toObject = (root, data) =>
  parsers[extname(root)](data);

const gendiff = (path1, path2, option = 'defaultRender') => {
  const getData = source => fs.readFileSync(source, 'utf8');
  const obj1 = toObject(path1, getData(path1));
  const obj2 = toObject(path2, getData(path2));
  return renderers[option](parse(obj1, obj2));
};

export default gendiff;
