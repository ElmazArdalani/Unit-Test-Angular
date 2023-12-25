import {HttpClient} from "@angular/common/http";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

let testUrl = '/data'

interface Data {
  name: string;
}

describe('Http client Testing Module', () => {
  let httpClient: HttpClient
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    httpClient = TestBed.inject(HttpClient)
  })

  it('should call the testUrl with get request', () => {
    httpClient.get<Data>(testUrl)
  })
})
