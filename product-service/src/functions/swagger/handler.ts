import { middyfy } from '@libs/lambda';
import * as path from 'path';
import * as fs from 'fs';
import { getAbsoluteFSPath } from 'swagger-ui-dist';

const getSwaggerJson = () => {
  return fs.readFileSync('./openapi.json', 'utf-8');
};

const getStaticFile = (fileName) => {
  const filePath = path.join('node_modules', 'swagger-ui-dist', fileName);
  return fs.readFileSync(filePath, 'utf-8');
};

const swaggerUI = async (event) => {
  // Check if requesting JSON or the UI
  if (event.path.endsWith('openapi.json')) {
    return {
      statusCode: 200,
      body: getSwaggerJson(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  const requestedFile = event.path.split('/').pop();

  // Serving CSS
  if (requestedFile === 'swagger-ui.css') {
    console.log('requestedFile', requestedFile);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/css' },
      body: getStaticFile('swagger-ui.css'),
    };
  }

  // Serving JS or any other required assets...
  if (requestedFile === 'swagger-ui-bundle.js') {
    console.log('requestedFile', requestedFile);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/javascript' },
      body: getStaticFile('swagger-ui-bundle.js'),
    };
  }
  const swaggerUiAssetPath = getAbsoluteFSPath();
  // Load the Swagger UI HTML
  const swaggerHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Swagger UI</title>
            <link rel="stylesheet" type="text/css" href="./swagger/swagger-ui.css">
            <script src="./swagger/swagger-ui-bundle.js"></script>
        </head>
        <body>
            <div id="swagger-ui"></div>
            <script>
                SwaggerUIBundle({
                    url: "./swagger/openapi.json",
                    dom_id: '#swagger-ui',
                    presets: [
                        SwaggerUIBundle.presets.apis
                    ]
                });
            </script>
        </body>
        </html>
    `;

  return {
    statusCode: 200,
    body: swaggerHtml,
    headers: {
      'Content-Type': 'text/html',
    },
  };
};
export const main = middyfy(swaggerUI);
