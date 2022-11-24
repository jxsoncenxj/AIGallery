import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Item } from "../components/Item";
import { useState } from "react";

export default function Main() {
  const componentArray = [
    <Item
      key="key-1"
      image="mountain_guardian.jpg"
      price="199.99"
      art_name="Mountain Gurardian"
    />,
    <Item
      key="key-2"
      image="silent_nature.jpg"
      price="179.99"
      art_name="Silent Nature"
    />,
    <Item
      key="key-3"
      image="angel_of_death.jpg"
      price="150.00"
      art_name="Angel Of Death"
    />,
    <Item
      key="key-4"
      image="old_town_road.jpg"
      price="135.00"
      art_name="Old Town Road"
    />,
    <Item
      key="key-5"
      image="the_heavens.jpg"
      price="239.99"
      art_name="The Heavens"
    />,
    <Item
      key="key-6"
      image="space_dogs.jpg"
      price="95.00"
      art_name="Space Dogs"
    />,
    <Item
      key="key-7"
      image="the_lighthouse.jpg"
      price="370.00"
      art_name="The Lighthouse"
    />,
    <Item
      key="key-8"
      image="the_chosen_one.jpg"
      price="400.00"
      art_name="The Chosen One"
    />,
    <Item
      key="key-9"
      image="faster_than_the_speed_of_light.jpg"
      price="150.00"
      art_name="Faster Than The Speed Of Light"
    />,
    <Item
      key="key-10"
      image="ghost_town.jpg"
      price="220.00"
      art_name="Ghost Town"
    />,
    <Item
      key="key-11"
      image="80s_london.jpg"
      price="80.00"
      art_name="80s London"
    />,
    <Item
      key="key-12"
      image="hole.jpg"
      price="250.00"
      art_name="Hole"
    />,
  ];
  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col items-center mt-20 ">
        <div className="grid gap-x-64  gap-y-32 grid-cols-1 grid-flow-row md:grid-cols-2 place-items-center ">
          {componentArray}
        </div>
      </main>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
