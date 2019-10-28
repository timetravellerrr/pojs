class Pokemon {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.sprite = data.sprites.front_default;
      this.sprites = data.sprites;
      this.types = data.types;
      this.height = data.height;
      this.weight = data.weight;
      this.abilities = data.abilities;
      this.moves = data.moves;
      this.base_experience = data.base_experience;
      this.is_default = data.is_default;
      this.order = data.order;
      this.forms = data.forms;
      this.game_indices = data.game_indices;
      this.held_items = data.held_items;
      this.location_area_encounters = data.location_area_encounters;
      this.species = data.species;
      this.stats = data.stats;
    }
  }
  
  export default Pokemon;