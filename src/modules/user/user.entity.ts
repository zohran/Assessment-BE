import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { NextFunction } from 'express';
import { hashPassword } from 'src/utils/bcypt';

@Schema()
export class UserEntity {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  @IsOptional()
  access_token?: string;

  @Prop()
  @IsOptional()
  refresh_token?: string;
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
