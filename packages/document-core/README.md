# @infocare/document-core

This is the core library used to build the email messages with (@infocare/email-builder)[https://github.com/guygubaby/email-builder-vue]. It is non-opinionated and light on dependencies so that it can be used to compose complex documents.

## Installation

**Installation with npm**

```bash
npm install --save @infocare/document-core
```

## Usage

The root of the library is the `DocumentBlocksDictionary` dictionary. This is a mapping of block names to an object with a zod schema and a corresponding Vue Component.

```js
const dictionary = {
  Alert: {
    schema: z.object({
      message: z.string(),
    }),
    Component: ({ message }: { message: string }) => {
      return <div>{message.toUpperCase()}</div>
    }
  }
}
```

This dictionary object is passed as an argument to the builder component.

### `BuildBlockComponent`

```vue
<BuildBlockComponent :blocks="dictionary" type="Alert" :data="{ message: 'Hello World' }" />
```

### `buildBlockConfigurationSchema`

```js
const Schema = buildBlockConfigurationSchema(dictionary);

const parsedData = Schema.safeParse({
  type: 'Alert',
  data: { message: 'Hello World' },
});
```
