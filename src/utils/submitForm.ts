import {validateForm} from "./validateForm";

export function submitForm(elItems: any, sItem: string) {
  elItems.forEach((item: any) => validateForm(item._element, sItem));

  if (elItems.every((item: any) => !item._element.classList.contains(`${sItem}_error`))) {
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
