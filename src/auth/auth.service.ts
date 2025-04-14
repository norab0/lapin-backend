// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { username, email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return { message: 'Utilisateur enregistré avec succès' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('Utilisateur introuvable');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Mot de passe incorrect');

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
