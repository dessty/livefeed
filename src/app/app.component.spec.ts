import { AppComponent } from "./app.component"

describe('AppComponent', () => {
  let component: AppComponent

  beforeEach(() => {
    component = new AppComponent();
  })


  it('sample test to validate jest is correctly configured - component title sould be "livefeed', () => {
    expect(component.title).toEqual('livefeed');
  })
})