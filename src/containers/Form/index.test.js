import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";
import Modal from "../Modal";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
    await screen.findByText("Envoyer");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      render(<Form/>);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
    });
  });
});
