import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../Modal';
import {Input} from '../Input';
import { FoodData } from '../../types';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: FoodData) => void;
}

const ModalAddFood = ({isOpen, setIsOpen, handleAddFood}: ModalAddFoodProps) => {
  const formRef = createRef<FormHandles>();

  async function handleSubmit (  ) {

    if (formRef.current){

      const formulario = formRef.current;

      const image = formulario.getFieldValue('image');
      const name = formulario.getFieldValue('name');
      const price = formulario.getFieldValue('price');
      const description = formulario.getFieldValue('description');

      const newFood = {
        id: 1,
        image,
        name,
        price,
        description,
        available: false,
      };

      handleAddFood(newFood);
    }
    
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

}



export {ModalAddFood};
