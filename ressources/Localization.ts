import LocalizedStrings from 'localized-strings';

export enum Lang {
  FR = 'fr',
  EN = 'en',
}

export let opStrings = new LocalizedStrings({
  en: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    single_mapping: 'map',
    when: 'when',
    validate: 'validate',
    not: 'not',
    and: 'and',
    or: 'or',
    then: 'then',
    else: 'else',
    function: '-function-',
    'has value': 'has value',
    'is null': 'is null',
    'is not null': 'is not null',
    'is defined': 'is defined',
    'is undefined': 'is undefined',
    '=': '=',
    '!=': '!=',
    'match all': 'match all',
    'none match': 'match none',
    'match any': 'match any',
    contains: 'contains',
    matches: 'matches',
    'starts with': 'starts with',
    'ends with': 'ends with',
    length: 'length',
    'as integer': 'as integer',
    trimmed: 'trimmed',
    'upper case': 'upper case',
    'lower case': 'lower case',
    concat: 'concat',
    'replace all': 'replace all',
    'sub string': 'sub string',
    min: 'min',
    max: 'max',
    sum: 'sum',
    count: 'count',
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>=',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '->': 'to',
    using: 'using',
    'multiple inputs': 'multiple inputs',
    // Date
    'plus days': 'plus day(s)',
    'minus days': 'minus day(s)',
    'plus months': 'plus month(s)',
    'minus months': 'minus month(s)',
    'plus years': 'plus year(s)',
    'minus years': 'minus year(s)',
    'format iso': 'format iso',
    'format day month year': 'format day month year',
    'this year': 'this year',
    'this month': 'this month',
    today: 'today',
    tomorrow: 'tomorrow',
    'with day of month': 'with day of month',
    'with month': 'with month',
    'with year': 'with year',
    'with first day of next year': 'with first day of next year',
    'with last day of last year': 'with last day of last year',
    'month of': 'month of',
    'year of': 'year of',
    'date of': 'date of',
    'number of months since': 'number of month since',
    'number of months between': 'number of months between',
    'number of years between': 'number of years between',
    'age at': 'age at',
    // Iterable
    'contains all': 'contains all',
    'is empty': 'is empty',
    'is not empty': 'is not empty',
    'has size': 'has size',
    'has not size': 'has not size',
    // field
    'position of': 'position of',
    'tags of': 'tags of',
    functions: '-functions-',
    true: 'true',
    false: 'false',
  },
  fr: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    single_mapping: 'map',
    when: 'lorsque',
    validate: 'valider',
    not: 'non',
    and: 'et',
    or: 'ou',
    then: 'alors',
    else: 'sinon',
    function: '-fonction-',
    'has value': 'a la valeur',
    'is null': 'est nul',
    'is not null': 'est non nul',
    'is defined': 'est défini',
    'is undefined': 'est non défini',
    '=': '=',
    '!=': '!=',
    'match all': 'correspond à tout',
    'none match': 'correspond à aucun',
    'match any': 'correspond à au moins un',
    contains: 'contient',
    matches: 'correspond à',
    'starts with': 'commence par',
    'ends with': 'finit par',
    length: 'longueur',
    'as integer': 'en tant que entier',
    trimmed: 'trimmed',
    'upper case': 'majuscule',
    'lower case': 'minuscule',
    concat: 'concat',
    'replace all': 'remplace tout',
    'sub string': 'sub string',
    min: 'min',
    max: 'max',
    sum: 'somme',
    count: "nombre d'occurence",
    '<': '<',
    '<=': '<=',
    '>': '>',
    '>=': '>=',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '->': 'vers',
    using: 'avec',
    'multiple inputs': 'entrées multiples',
    // Date
    'plus days': 'plus jour(s)',
    'minus days': 'moins jour(s)',
    'plus months': 'plus mois',
    'minus months': 'moins mois',
    'plus years': 'plus année(s)',
    'minus years': 'moins année(s)',
    'format iso': 'format iso',
    'format day month year': 'format jour mois année',
    'this year': 'cette année',
    'this month': 'ce mois',
    today: 'ce jour',
    tomorrow: 'demain',
    'with day of month': 'au jour du mois',
    'with month': 'au mois',
    'with year': 'à l’année',
    'with first day of next year': "au premier jour de l'année suivante",
    'with last day of last year': "au dernier jour de l'année précédente",
    'month of': 'mois de',
    'year of': 'année de',
    'date of': 'date de',
    'number of months since': 'nombre de mois depuis',
    'number of months between': 'nombre de mois entre',
    'number of years between': "nombre d'année entre",
    'age at': 'âge à',
    // Iterable
    'contains all': 'contient tout',
    'is empty': 'est vide',
    'is not empty': 'est non vide',
    'has size': 'a pour taille',
    'has not size': 'taille différente de',
    // field
    'position of': 'position de',
    'tags of': 'tags de',
    functions: '-fonctions-',
    true: 'vrai',
    false: 'faux',
  },
});
