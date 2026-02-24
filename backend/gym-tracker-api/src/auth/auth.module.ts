import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret:  process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule { }
