#  use-upload
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![Netlify Status](https://api.netlify.com/api/v1/badges/ab58f80d-099a-46f2-b6a5-37ae842a3cec/deploy-status)](https://app.netlify.com/sites/zealous-sinoussi-608791/deploys)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Upload files client side with presigned URLs from any cloud storage

### [Docs & Examples](https://use-upload.netlify.app/)

## 🚀 Installation

With `npm`:
```
npm install --save use-upload
```

With `yarn`:
```
yarn add use-upload
```

## 🖥️ Usage

You will need an API endpoint that returns you a presigned URL from the storage service you are using. If you don't know what a presigned URL is, please go to the [How to use](https://use-upload.netlify.app/#how-to-use) section in the docs and you'll learn more

Once you have a valid endpoint, just import accordingly:

With `REST`:
```js
import { useRestUpload } from 'use-upload';

const MyComponent = () => {
  const { 
    upload,
    uploading,
    progress,
    reset 
  } = useRestUpload(
    '<YOUR-ENDPOINT>', 
    { ...config }
  )

  const handleUpload = () => {
    // Config is equivalent to client.query(_, config)
    // See: https://github.com/axios/axios#request-config
    const finalUrl = await upload(file, config);
  }

  return (
    ...
  )
}
```

With `graphql`:
```js
import { useGraphqlUpload } from 'use-upload';

const MyComponent = () => {
  const { 
    upload,
    uploading,
    progress,
    reset 
  } = useGraphqlUpload(
    gqlQueryDefinition, // Using gql tag
    { 
      ...config, 
      apolloClient: <APOLLO-CLIENT-INSTANCE> // A valid apollo client instance is required
    }
  )

  const handleUpload = () => {
    // Config is equivalent to axios config
    // See: https://www.apollographql.com/docs/react/data/queries/#options
    const finalUrl = await upload(file, config);
  }

  return (
    ...
  )
}
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ernestognw"><img src="https://avatars2.githubusercontent.com/u/33379285?v=4" width="100px;" alt=""/><br /><sub><b>Ernesto García</b></sub></a><br /><a href="https://github.com/ernestognw/use-upload/commits?author=ernestognw" title="Code">💻</a> <a href="https://github.com/ernestognw/use-upload/commits?author=ernestognw" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!