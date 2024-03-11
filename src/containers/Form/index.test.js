import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";


describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSucess = jest.fn();
      render(<Form onSuccess={onSucess(true)}/>);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      expect(onSucess).toHaveBeenCalled()
      await screen.findByText("Envoyer", {}, { timeout: 1500 });
    });
  });
});
