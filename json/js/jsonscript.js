
// داده‌های اصلی
const mainPageData = {
    product_groups: [
        { group_id: 1, group_title: "ساندویچ", group_image: "images/burger-7-310x260.png" },
        { group_id: 2, group_title: "پیتزا", group_image: "images/pizza-7-310x260.png" },
        { group_id: 3, group_title: "کباب", group_image: "images/barbecue-7-310x260.png" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    createProductBoxes(mainPageData);
});

function createProductBoxes(productsData) {
    const mainFoodsContainer = document.getElementById('main-foods');
    if (!mainFoodsContainer) return;
    
    mainFoodsContainer.innerHTML = '';
    
    productsData.product_groups.forEach(group => {
        const foodBox = document.createElement('div');
        foodBox.className = 'food-box';
        foodBox.innerHTML = `
            <div class="menu-variant-1">
                <img src="${group.group_image}" alt="${group.group_title}" width="310" height="260">
                <div class="caption">
                    <h5 class="title">
                        <a href="menu-single.html?group=${group.group_id}" class="link-white">
                            ${group.group_title}
                        </a>
                    </h5>
                </div>
            </div>
        `;
        
        mainFoodsContainer.appendChild(foodBox);
    });
}