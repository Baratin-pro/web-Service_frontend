import { Source } from './../models/source.model';
import { httpRequestInstance } from './httpRequest';

export class SourceService {
  public sourceLike(sourceId: number, type: string, like: string) {
    return httpRequestInstance.post(Source, `/source/${sourceId}`, { type, like })
  }

  public sourceFavory(sourceId: number, type: string, favory: string) {
    return httpRequestInstance.post(Source, `/source/${sourceId}`, { type, favory })
  }

  public getBySourceId(sourceId: number) {
    return httpRequestInstance.get<Source>(Source, `/source/${sourceId}`)
  }

  public getFavoritesByUser() {
    return httpRequestInstance.get<Source[]>(Source, '/source')
  }
}