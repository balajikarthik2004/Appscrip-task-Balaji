'use client';
import React, { useState, useEffect } from 'react';
import { FiHeart, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import styles from './Products.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [sortOption, setSortOption] = useState('recommended');
  const [selectedFilters, setSelectedFilters] = useState({
    idealFor: [],
    occasion: [],
    fabric: [],
    segment: [],
    suitableFor: [],
    rawMaterials: [],
    pattern: [],
    jacketMaterial: [],
    sleeveLength: [],
    sleeve: []
  });
  const [expandedCategories, setExpandedCategories] = useState({});

  // Filter options data
  const filterOptions = {
    idealFor: {
      "Men": 65,
      "Women": 63,
      "Baby & Kids": 59
    },
    occasion: {
      "Work": 12,
      "Casual": 3,
      "Wedding": 1,
      "Party": 10,
      "Rainy Season": 1
    },
    fabric: {
      "Cotton": 13,
      "Silk": 2,
      "Wool": 2,
      "Linen": 5,
      "French Knot": 2,
      "Zardosi": 2,
      "Satin Blend": 1,
      "Muslin": 1,
      "Embroidery": 1
    },
    segment: {
      "Ethnic": 2,
      "Contemporary": 11,
      "Western Wear": 1,
      "Formal Wear": 1,
      "Casual Wear": 7
    },
    suitableFor: {
      "Silver": 4,
      "Tericoat": 1,
      "Satin": 1,
      "Regular": 2,
      "Fancy": 1
    },
    rawMaterials: {
      "Raw Silk": 2,
      "Cotton Silk": 3,
      "Leather": 2,
      "Cellulosic Fibers": 4
    },
    pattern: {
      "Windowpane": 2,
      "Pinstripes": 1,
      "Solid": 2,
      "Chalk Stripes": 2,
      "Tartan": 1,
      "Slim Fit": 1
    },
    jacketMaterial: {
      "Velvet": 5,
      "Cotton": 7,
      "Leather": 13
    },
    sleeveLength: {
      "Half Sleeve": 2,
      "Cap Sleeve": 10,
      "Full Sleeve": 5
    },
    sleeve: {
      "Roll-Up Sleeve": 1,
      "Regular Sleeves": 1,
      "Long Sleeve": 1
    }
  };

  // Initialize expanded categories
  useEffect(() => {
    const initialExpanded = {};
    Object.keys(filterOptions).forEach(category => {
      initialExpanded[category] = false;
    });
    setExpandedCategories(initialExpanded);
  }, []);

  // Fetch products from FakeStoreAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Add mock data for our filters since FakeStoreAPI doesn't have all fields
        const enhancedData = data.map(product => ({
          ...product,
          // Mock data for demonstration
          gender: ['male', 'female'][Math.floor(Math.random() * 2)],
          occasion: ['Work', 'Casual', 'Wedding', 'Party'][Math.floor(Math.random() * 4)],
          material: ['Cotton', 'Silk', 'Wool', 'Linen'][Math.floor(Math.random() * 4)],
          style: ['Ethnic', 'Contemporary', 'Western'][Math.floor(Math.random() * 3)],
          suitableFor: ['Silver', 'Regular', 'Fancy'].slice(0, Math.floor(Math.random() * 3)),
          materials: ['Raw Silk', 'Cotton Silk', 'Leather'].slice(0, Math.floor(Math.random() * 3)),
          pattern: ['Solid', 'Striped', 'Printed'][Math.floor(Math.random() * 3)],
          jacketMaterial: ['Leather', 'Denim', 'Wool'][Math.floor(Math.random() * 3)],
          sleeveLength: ['Full Sleeve', 'Half Sleeve', 'Short Sleeve'][Math.floor(Math.random() * 3)],
          sleeveType: ['Regular', 'Cap', 'Roll-Up'][Math.floor(Math.random() * 3)]
        }));
        setProducts(enhancedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    return Object.entries(selectedFilters).every(([category, selectedValues]) => {
      if (selectedValues.length === 0) return true;

      switch(category) {
        case 'idealFor':
          return selectedValues.some(value => {
            if (value === 'Men') return product.gender === 'male';
            if (value === 'Women') return product.gender === 'female';
            if (value === 'Baby & Kids') return false; // No kids products in this API
            return false;
          });

        case 'occasion':
          return selectedValues.includes(product.occasion);

        case 'fabric':
          return selectedValues.some(fabric => 
            product.material.toLowerCase().includes(fabric.toLowerCase())
          );

        case 'segment':
          return selectedValues.includes(product.style);

        case 'suitableFor':
          return selectedValues.some(value => 
            product.suitableFor?.includes(value)
          );

        case 'rawMaterials':
          return selectedValues.some(material => 
            product.materials?.includes(material)
          );

        case 'pattern':
          return selectedValues.includes(product.pattern);

        case 'jacketMaterial':
          return selectedValues.includes(product.jacketMaterial);

        case 'sleeveLength':
          return selectedValues.includes(product.sleeveLength);

        case 'sleeve':
          return selectedValues.includes(product.sleeveType);

        default:
          return true;
      }
    });
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'newest':
        return new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id);
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      case 'popular':
        return b.rating.count - a.rating.count;
      default: // recommended
        return b.rating.rate - a.rating.rate;
    }
  });

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Toggle filter selection
  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[category] || [];
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  // Select all filters in a category
  const selectAllFilters = (category) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: Object.keys(filterOptions[category])
    }));
  };

  // Unselect all filters in a category
  const unselectAllFilters = (category) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: []
    }));
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.topControls}>
        <div className={styles.leftControls}>
          <span className={styles.resultsCount}>{filteredProducts.length}50 Items</span>
          <button 
            className={styles.filterToggle} 
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'HIDE FILTER' : 'SHOW FILTER'}
          </button>
        </div>
        <div className={styles.rightControls}>
          <div className={styles.sortDropdown}>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="recommended">RECOMMENDED</option>
              <option value="newest">Newest first</option>
              <option value="popular">Popular</option>
              <option value="price-high">Price: high to low</option>
              <option value="price-low">Price: low to high</option>
            </select>
            <FiChevronDown className={styles.dropdownIcon} />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Filters Section */}
        {showFilters && (
          <aside className={styles.filters}>
            <div className={styles.filterCategories}>
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className={styles.filterCategory}>
                  <div 
                    className={styles.filterCategoryHeader}
                    onClick={() => toggleCategory(category)}
                  >
                    <h3 className={styles.filterCategoryTitle}>
                      {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </h3>
                    {expandedCategories[category] ? (
                      <FiChevronDown className={styles.categoryArrow} />
                    ) : (
                      <FiChevronRight className={styles.categoryArrow} />
                    )}
                  </div>
                  
                  {expandedCategories[category] && (
                    <>
                      <div className={styles.filterActions}>
                        <button onClick={() => selectAllFilters(category)}>All</button>
                        <button onClick={() => unselectAllFilters(category)}>Unselect All</button>
                      </div>
                      <ul className={styles.filterOptions}>
                        {Object.entries(options).map(([option, count]) => (
                          <li key={option}>
                            <label className={styles.filterLabel}>
                              <input
                                type="checkbox"
                                checked={selectedFilters[category]?.includes(option)}
                                onChange={() => toggleFilter(category, option)}
                              />
                              <span className={styles.filterOptionText}>
                                {option} <span className={styles.filterCount}>({count})</span>
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Main Products Section */}
        <main className={styles.productsMain}>
          <div className={styles.productsGrid}>
            {loading ? (
              <div className={styles.loading}>Loading products...</div>
            ) : (
              sortedProducts.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImageContainer}>
                    <div className={styles.imageWrapper}>
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className={styles.productImage}
                        loading="lazy"
                      />
                    </div>
                    <button 
                      className={`${styles.wishlistButton} ${wishlist.includes(product.id) ? styles.active : ''}`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <FiHeart size={18} />
                    </button>
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>Sign in or Create an account to see pricing</p>
                    <div className={styles.productRating}>
                      {Array(5).fill().map((_, i) => (
                        <span 
                          key={i} 
                          className={i < Math.round(product.rating.rate) ? styles.filled : ''}
                        >
                          ★
                        </span>
                      ))}
                      <span>({product.rating.count})</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.loadMore}>
            <button>LOAD MORE</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;