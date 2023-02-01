import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Admin {
  @Prop({ required: true })
  password_hash: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;
}

export type AdminDocument = Admin & Document;
export const AdminSchema = SchemaFactory.createForClass(Admin);
