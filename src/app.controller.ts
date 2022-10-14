import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  home(@Req() _req: Request) {
    return 'hello world';
  }
}
