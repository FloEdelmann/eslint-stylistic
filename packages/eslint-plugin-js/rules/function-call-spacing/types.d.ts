/* GENERATED, DO NOT EDIT DIRECTLY */

/* @checksum: vQZMyducOg */

export type FunctionCallSpacingSchema0 =
  | []
  | ['never']
  | []
  | ['always']
  | [
    'always',
    {
      allowNewlines?: boolean
    },
  ]

export type FunctionCallSpacingRuleOptions =
  FunctionCallSpacingSchema0

export type RuleOptions = FunctionCallSpacingRuleOptions
export type MessageIds =
  | 'unexpectedWhitespace'
  | 'unexpectedNewline'
  | 'missing'
