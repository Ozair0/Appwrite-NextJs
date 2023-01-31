## NextJs with Appwrite

### 1: Appwrite server with docker:

```bash
# The command works on CMD for other commands refer to: https://appwrite.io/docs/installation 
docker run -it --rm ^
    --volume //var/run/docker.sock:/var/run/docker.sock ^
    --volume "%cd%"/appwrite:/usr/src/code/appwrite:rw ^
    --entrypoint="install" ^
    appwrite/appwrite:1.2.0
```

### 2: Create a database in Appwrite for todos, edit project and database ids with endpoint value
```
1: Edit project id in appwrite/appwrite.ts

  .setProject("63d788a15d65fe44c2a9");
  
2: Edit site endpoint in next.config.js
    destination: "http://localhost/v1/:path*",

3: Edit database ids in bello file

    components/TodoForm.tsx
    components/Todos.tsx
```

### 3: Now run NextJs app
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```