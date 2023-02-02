import { useState, useCallback } from 'react';

export default function useFormWithValidation() {
  const [isValid, setIsValid] = useState(false);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const input = e.target;
    const { value, name } = input;

    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя должно содержать только кириллицу, латиницу, пробел или дефис')
    } else {
      input.setCustomValidity('');
    }

    if (name === 'email' && input.validity.patternMismatch) {
      input.setCustomValidity('Некорректый введен адрес почты');
    } else {
        input.setCustomValidity('');
    }
console.log(e.target)
    setValues({ ...values, [name]: value }); // универсальный обработчик полей
    setErrors({ ...errors, [name]: input.validationMessage }); // ошибок
    setIsValid(input.closest('form').checkValidity()); // проверка валидности
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => { // это метод для сброса формы, полей, ошибок
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setIsValid };
}