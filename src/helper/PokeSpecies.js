class PokeSpecies {
    constructor(data) {      
      this.id = data.id;
      this.name = data.name;
      this.order = data.order;
      this.gender_rate = data.gender_rate;
      this.capture_rate = data.capture_rate;
      this.base_happiness = data.base_happiness;
      this.is_baby = data.is_baby;
      this.hatch_counter = data.hatch_counter;
      this.has_gender_differences = data.has_gender_differences;
      this.forms_switchable = data.forms_switchable;
      this.growth_rate = data.growth_rate;
      this.pokedex_numbers = data.pokedex_numbers;
      this.egg_groups = data.egg_groups;
      this.color = data.color;
      this.egg_groups = data.egg_groups;
      this.shape = data.shape;
      this.evolves_from_species = data.evolves_from_species;
      this.evolution_chain = data.evolution_chain;
      this.habitat = data.habitat;
      this.generation = data.generation;
      this.names = data.names;
      this.pal_park_encounters = data.pal_park_encounters;
      this.flavor_text_entries = data.flavor_text_entries;
      this.form_descriptions = data.form_descriptions;
      this.genera = data.genera;
      this.varieties = data.varieties;
    }
  }
  
  export default PokeSpecies;