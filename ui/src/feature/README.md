# Most importantly,

before doing anything else, refer to `ChunkChain.isNextValidChunk(chunk)`

its purpose is to check which chunks can be suggested to the user.

## It does this in a few ways

### InputType checking

### QueryType checking

it checks the query type of the proposed next chunk

and depending on the current state of the chunk chain,

it determines if it is valid or not

ex:
This function is where all the work in this feature so far culminates

It is the meat and potatoes of how the architecture works

### Outstanding Questions:

I'm hoping these can be answered post MVP...

- How do we name the aliases?
  - Example:
    ```
    WITH *, MATCH(p:Player)-[:HAD]->(pg:PlayerGame)-[:OF]->(g:Game)<-[:OF]-(pg2??)-[:HAD]-(p2???)
    ```
- How do we know which of the aliases to use if there are many of the same type available?
- How do we communicate to the user which of those aliases are being used?
- How do we let them choose?

### Outstanding Answers?:

I think it lies somewhere in how the user fills the slot

The alias at first is generic, like p

But once the user has identified that player by position or name,

We can then name the alias like pJoshAllen or pQB

Which is a contatenated version of

the generic `p` the system uses for all Player entities

and

the name the user gave it

so an alias could be ...

```ts
type aliasName = {
  descriptiveName: string?;
  placeholderName: string;
  name: string;
};

type aliasValue = Neo4jPropertyValue;

type alias = Record<aliasName, Neo4jPropertyValue>;
```
