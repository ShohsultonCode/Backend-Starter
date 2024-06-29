import { UnauthorizedException } from '@nestjs/common';
import { oauth2Client, oauth2ClientId } from './config';

export const verifyGoogleUser = async (token: string) => {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: oauth2ClientId,
    });
    
    const payload = await ticket?.getPayload();
    if (!payload)
      return { userId: undefined, email: undefined, name: undefined };
    const { sub, email, name } = payload;
    return {
      userId: sub,
      email,
      name,
    };
  } catch (error) {
    console.log(error);
    throw new UnauthorizedException(error);
  }
};

