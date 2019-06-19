import * as moduleAlias from 'module-alias';

export default function aliasConfig(dirname: string) {
  console.log('dirname: ', dirname);
  const aliases = {
    '@commons': dirname + '/src/commons',
    '@config': dirname + '/src/config',
    '@controllers': dirname + '/src/controllers',
    '@models': dirname + '/src/models',
    '@providers': dirname + '/src/providers',
    '@routes': dirname + '/src/routes'
  };
  moduleAlias.addAliases(aliases);
  return aliases;
}
