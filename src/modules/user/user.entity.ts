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

UserEntitySchema.pre<UserEntity>('save', async function (next: NextFunction) {
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

// UserEntitySchema.post(
//   /^find/,
//   function (docs: UserEntity[] | UserEntity, next: NextFunction) {
//     if (Array.isArray(docs)) {
//       docs.forEach((doc) => {
//         if (doc.password !== undefined) {
//           doc.password = undefined;
//         }
//       });
//     } else {
//       if (docs.password !== undefined) {
//         docs.password = undefined;
//       }
//     }
//     next();
//   },
// );
