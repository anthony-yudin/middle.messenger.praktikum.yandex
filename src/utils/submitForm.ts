import {validateForm} from "./validateForm";
import {BlockProps} from "../framework/Block";

export function submitForm(elItems: BlockProps[], sItem: string) {
  elItems.forEach((item: BlockProps) => validateForm(item._element, sItem));

  if (elItems.every((item: BlockProps) => !item._element.classList.contains(`${sItem}_error`))) {
    const elForm: HTMLFormElement = elItems[0]._element.closest('form');
    const formData: {[index: string]: string} = {}

    elForm.querySelectorAll('input, textarea').forEach((item: HTMLInputElement | HTMLTextAreaElement) => {
      const nameInput: string | null = item.getAttribute('name');

      if (nameInput) {
        formData[nameInput] = item.value;
      }
    });

    console.log('formData:', formData);

    if (Object.values(formData)?.length) {
      return true;
    }
  }

  return false;
}
