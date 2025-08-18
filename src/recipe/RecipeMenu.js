import React, { useEffect, useMemo, useState } from "react";
import "./RecipeMenu.css";

const RECIPES = [
  {
    id: "pasta-alfredo",
    name: "Pasta Alfredo",
    category: "Dinner",
    cookTimeMinutes: 25,
    shortDescription: "Creamy garlic parmesan pasta.",
    imageUrl:
      "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    difficulty: "Easy",
    serves: 2,
    ingredients: [
      "200g fettuccine",
      "2 tbsp butter",
      "2 cloves garlic (minced)",
      "200ml cream",
      "50g parmesan (grated)",
      "Salt & pepper"
    ],
    steps: [
      "Boil pasta until al dente.",
      "Melt butter and sauté garlic.",
      "Add cream, simmer, then stir in parmesan.",
      "Toss pasta with sauce; season and serve."
    ]
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Breakfast",
    cookTimeMinutes: 10,
    shortDescription: "Toasted bread with mashed avocado.",
    imageUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 1,
    ingredients: [
      "2 slices sourdough",
      "1 ripe avocado",
      "Lemon juice",
      "Chili flakes",
      "Salt"
    ],
    steps: [
      "Toast bread.",
      "Mash avocado with lemon and salt.",
      "Spread on toast; top with chili flakes."
    ]
  },
  {
    id: "berry-parfait",
    name: "Berry Yogurt Parfait",
    category: "Snack",
    cookTimeMinutes: 5,
    shortDescription: "Layers of yogurt, berries, and granola.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1713719216015-00a348bc4526?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    difficulty: "Easy",
    serves: 1,
    ingredients: [
      
      "1 cup yogurt",
      "1/2 cup mixed berries",
      "1/4 cup granola",
      "Honey (optional)"
    ],
    steps: [
      "Layer yogurt, berries, and granola in a glass.",
      "Drizzle with honey if desired."
    ]
  },
  {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    category: "Dinner",
    cookTimeMinutes: 30,
    shortDescription: "Classic tomato, mozzarella, and basil pizza.",
    imageUrl:
      "https://images.unsplash.com/photo-1542282811-943ef1a977c3?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Medium",
    serves: 2,
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Basil", "Olive oil"],
    steps: [
      "Stretch dough.",
      "Spread sauce and top with mozzarella.",
      "Bake hot until bubbly; finish with basil and oil."
    ]
  },
  {
    id: "chicken-teriyaki",
    name: "Chicken Teriyaki",
    category: "Dinner",
    cookTimeMinutes: 25,
    shortDescription: "Sweet-savory glazed chicken over rice.",
    imageUrl:
      "https://media.istockphoto.com/id/1417535846/photo/japanese-style-chicken-teriyaki.jpg?s=2048x2048&w=is&k=20&c=PfvdhbFLSOP1XT8ndRhnR3KICwniDJ-_4vs74oiqJkY=",
    difficulty: "Easy",
    serves: 2,
    ingredients: ["Chicken thighs", "Soy sauce", "Mirin", "Sugar", "Ginger", "Rice"],
    steps: ["Sear chicken.", "Simmer with teriyaki sauce.", "Serve over rice."]
  },
  {
    id: "caesar-salad",
    name: "Chicken Caesar Salad",
    category: "Lunch",
    cookTimeMinutes: 15,
    shortDescription: "Crisp romaine with chicken, croutons, and parmesan.",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 2,
    ingredients: ["Romaine", "Grilled chicken", "Croutons", "Parmesan", "Caesar dressing"],
    steps: ["Toss romaine with dressing.", "Top with chicken, croutons, parmesan."]
  },
  {
    id: "tomato-soup",
    name: "Tomato Basil Soup",
    category: "Lunch",
    cookTimeMinutes: 20,
    shortDescription: "Silky tomato soup with fresh basil.",
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 2,
    ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable broth", "Basil", "Cream"],
    steps: ["Sauté aromatics.", "Simmer tomatoes.", "Blend smooth; add cream and basil."]
  },
  {
    id: "buttermilk-pancakes",
    name: "Buttermilk Pancakes",
    category: "Breakfast",
    cookTimeMinutes: 15,
    shortDescription: "Fluffy golden pancakes with syrup.",
    imageUrl:
      "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 2,
    ingredients: ["Flour", "Buttermilk", "Egg", "Baking powder", "Sugar", "Butter"],
    steps: ["Mix batter.", "Cook on griddle until bubbles.", "Flip and serve."]
  },
  {
    id: "chocolate-brownie",
    name: "Chocolate Brownies",
    category: "Dessert",
    cookTimeMinutes: 35,
    shortDescription: "Rich and fudgy chocolate brownies.",
    imageUrl:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476b?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 8,
    ingredients: ["Butter", "Sugar", "Eggs", "Cocoa", "Flour", "Chocolate chips"],
    steps: ["Melt butter and cocoa.", "Mix with sugar and eggs.", "Add flour; bake."]
  },
  {
    id: "smoothie-bowl",
    name: "Tropical Smoothie Bowl",
    category: "Snack",
    cookTimeMinutes: 7,
    shortDescription: "Thick mango-pineapple smoothie with toppings.",
    imageUrl:
      "https://images.unsplash.com/photo-1542444459-db63c910d2c0?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 1,
    ingredients: ["Mango", "Pineapple", "Banana", "Yogurt", "Granola", "Coconut"],
    steps: ["Blend fruits and yogurt.", "Top with granola and coconut."]
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    category: "Dinner",
    cookTimeMinutes: 20,
    shortDescription: "Lemon herb grilled salmon fillet.",
    imageUrl:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b6?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Medium",
    serves: 2,
    ingredients: ["Salmon", "Lemon", "Olive oil", "Garlic", "Parsley", "Salt"],
    steps: ["Marinate.", "Grill until flaky.", "Finish with lemon and herbs."]
  },
  {
    id: "veggie-burger",
    name: "Veggie Burger",
    category: "Lunch",
    cookTimeMinutes: 20,
    shortDescription: "Grilled veggie patty with fresh toppings.",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 1,
    ingredients: ["Veggie patty", "Bun", "Lettuce", "Tomato", "Onion", "Sauce"],
    steps: ["Grill patty.", "Assemble burger with toppings."]
  },
  {
    id: "shawarma-wrap",
    name: "Chicken Shawarma Wrap",
    category: "Dinner",
    cookTimeMinutes: 30,
    shortDescription: "Spiced chicken wrapped with garlic sauce.",
    imageUrl:
      "https://images.unsplash.com/photo-1604908554184-83b0e1c4e5ab?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Medium",
    serves: 2,
    ingredients: ["Chicken", "Shawarma spices", "Flatbread", "Garlic sauce", "Pickles"],
    steps: ["Marinate and cook chicken.", "Wrap with sauce and pickles."]
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    category: "Dessert",
    cookTimeMinutes: 40,
    shortDescription: "Coffee-soaked ladyfingers with mascarpone.",
    imageUrl:
      "https://images.unsplash.com/photo-1603899122617-3b2d2a9f3d2e?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Medium",
    serves: 6,
    ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Eggs", "Cocoa"],
    steps: ["Dip ladyfingers.", "Layer with mascarpone.", "Chill and dust with cocoa."]
  },
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    category: "Drink",
    cookTimeMinutes: 5,
    shortDescription: "Refreshing mango yogurt drink.",
    imageUrl:
      "https://images.unsplash.com/photo-1593829124030-9b76c1ef0a4f?q=80&w=1200&auto=format&fit=crop",
    difficulty: "Easy",
    serves: 2,
    ingredients: ["Mango", "Yogurt", "Milk", "Sugar", "Cardamom"],
    steps: ["Blend all ingredients until smooth."]
  }
];

const categoriesFromRecipes = (recipes) => {
  const set = new Set(recipes.map((r) => r.category));
  return ["All", ...Array.from(set)];
};

const RecipeMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("recipe:favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = useMemo(() => categoriesFromRecipes(RECIPES), []);

  useEffect(() => {
    try {
      localStorage.setItem("recipe:favorites", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const visibleRecipes = useMemo(() => {
    let list = RECIPES;

    if (activeCategory !== "All") {
      list = list.filter((r) => r.category === activeCategory);
    }

    if (onlyFavorites) {
      list = list.filter((r) => favorites.includes(r.id));
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((r) => {
        const hay = [
          r.name,
          r.category,
          r.shortDescription,
          ...(r.ingredients || []),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    switch (sortBy) {
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "time-asc":
        list = [...list].sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
        break;
      case "time-desc":
        list = [...list].sort((a, b) => b.cookTimeMinutes - a.cookTimeMinutes);
        break;
      default:
        // relevance - keep as filtered order
        break;
    }

    return list;
  }, [activeCategory, query, sortBy, onlyFavorites, favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="recipe-app">
      <h1 className="recipe-title">Recipe Menu</h1>

      <div className="toolbar">
        <div className="toolbar-row">
          <div className="toolbar-left">
            <div className="search">
              <span className="search-icon">🔎</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes, ingredients..."
                aria-label="Search recipes"
              />
            </div>
            <div className="filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`chip ${activeCategory === cat ? "chip-active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="toolbar-right">
            <label className="favorite-toggle">
              <input
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => setOnlyFavorites(e.target.checked)}
              />
              <span>Favorites only</span>
            </label>
            <select
              className="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort recipes"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="name-asc">Name A → Z</option>
              <option value="name-desc">Name Z → A</option>
              <option value="time-asc">Time ↑</option>
              <option value="time-desc">Time ↓</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {visibleRecipes.map((recipe) => {
          const isFavorite = favorites.includes(recipe.id);
          return (
            <article key={recipe.id} className="card">
              <div className="card-media">
                <img src={recipe.imageUrl} alt={recipe.name} loading="lazy" />
                <button
                  className={`fav-btn ${isFavorite ? "is-fav" : ""}`}
                  onClick={() => toggleFavorite(recipe.id)}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? "★" : "☆"}
                </button>
                <span className="badge">{recipe.category}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{recipe.name}</h3>
                <p className="card-desc">{recipe.shortDescription}</p>
                <div className="card-meta">
                  <span>⏱ {recipe.cookTimeMinutes} min</span>
                  <span>👥 {recipe.serves}</span>
                  <span>🎯 {recipe.difficulty}</span>
                </div>
                <div className="card-actions">
                  <button className="btn btn-outline" onClick={() => setSelectedRecipe(recipe)}>
                    View Details
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        {visibleRecipes.length === 0 && (
          <div className="empty">
            No recipes found. Try adjusting filters or search.
          </div>
        )}
      </div>

      {selectedRecipe && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close" onClick={() => setSelectedRecipe(null)}>
              ✕
            </button>
            <div className="modal-media">
              <img src={selectedRecipe.imageUrl} alt={selectedRecipe.name} />
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{selectedRecipe.name}</h2>
              <p className="modal-desc">{selectedRecipe.shortDescription}</p>
              <div className="modal-meta">
                <span>⏱ {selectedRecipe.cookTimeMinutes} min</span>
                <span>👥 {selectedRecipe.serves}</span>
                <span>🎯 {selectedRecipe.difficulty}</span>
              </div>
              <div className="modal-columns">
                <div>
                  <h4>Ingredients</h4>
                  <ul>
                    {selectedRecipe.ingredients.map((ing) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Steps</h4>
                  <ol>
                    {selectedRecipe.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeMenu;



