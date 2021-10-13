import { useState } from 'react';
import api from '../../services/api';

import {Header} from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

import {FoodData , UpdateFoodData} from '../../types/index';
import { useEffect } from 'react';

const Dashboard = () => {

  const [foods, setFoods] = useState<FoodData[]>([]);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    
    async function loadFoods() {
      const response = await api.get<FoodData[]>('/foods');
      setFoods(response.data);
    }
    
    loadFoods();
    
  }, []);

   async function handleAddFood (food:FoodData) {
    
    const foodsCopy = [...foods];
    const lindex = (foodsCopy.length) - 1;
    const lastFoodID = foodsCopy[lindex].id;

    const newFood = {
      ...food,
      id: lastFoodID + 1,
      available: true,
    }

    await api.post('/foods', newFood);    

    foodsCopy.push(newFood);

    setFoods(foodsCopy);
    
  }

   async function handleUpdateFood (food: UpdateFoodData)  {

      const { data: foodUpdated }  = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsCopy = [...foods];

      const foodsUpdated = foodsCopy.map(food =>
        food.id !== foodUpdated.id ? food : foodUpdated
      );

      setFoods(foodsUpdated);
  }

  async function handleDeleteFood (id: number) {

    await api.delete(`/foods/${id}`);

    const fcpy = [...foods];

    const foodsFiltered = fcpy.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() { setModalOpen(!modalOpen) };


  function toggleEditModal(){ setEditModalOpen(!editModalOpen) };
  
  function handleEditFood (food: FoodData) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

}


export {Dashboard};
