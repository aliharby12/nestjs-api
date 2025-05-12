import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Your API Title')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth() // Optional: For JWT authentication
        .build();

    const document = SwaggerModule.createDocument(app, config);
    if (process.env.NODE_ENV !== 'production') {
        SwaggerModule.setup('swagger', app, document); // Use 'swagger' as the route
    }
}
