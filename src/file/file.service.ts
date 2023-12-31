import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export type FileType = 'audio' | 'cover';

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      //файлы сохраняются на уровень выше папки проетка
      const filePath = path.resolve(
        __dirname,
        '../../..',
        'second-music-player-files',
        type,
      );
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(file): any {
    try {
      const filePath = path.resolve(
        __dirname,
        '../../..',
        'second-music-player-files',
        file,
      );

      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log(filePath + ' was deleted');
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   removeFile(fileName: string) {}
}
