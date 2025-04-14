import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Lapin } from './lapin/lapin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'lapins',
     entities: [User, Lapin],
      synchronize: true, // à désactiver en prod !
    }),
     TypeOrmModule.forFeature([User, Lapin]),
  ],
})
export class AppModule {}
