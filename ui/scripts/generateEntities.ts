// 1. call GET /api/schema

// 2. parse response into types
//
// 3. write types into {LabelName}Entity.ts with the following characteristic
//
export interface LabelName extends Entity {
  label: AliasType.{LabelName};
  properties: {LabelName}Properties;
}

export type {LabelName}Properties = {
 /**
  *  Enumerate through properties of Label provided by the api/schema response
  *  ex: The following might be generated for a Player node
  *  Player identification
  **/
     first_name: string,
     last_name: string,
     birth_date: string

   */
}
