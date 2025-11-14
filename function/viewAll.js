document.addEventListener('DOMContentLoaded', function() {
            // --- 1. Get Elements ---
            // View Toggles
            const viewAllButton = document.querySelector('.view-all-btneen');
            const latestPostsGrid = document.getElementById('latestPostsGrid'); 
            const archiveView = document.getElementById('archiveView');

            // Modal Elements
            const postModal = document.getElementById('postModal');
            const closeButton = document.querySelector('.close-button');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalCategory = document.getElementById('modalCategory');
            const modalAuthor = document.getElementById('modalAuthor');
            const modalDate = document.getElementById('modalDate');
            const modalComments = document.getElementById('modalComments');

            // All clickable post cards
            const postCards = document.querySelectorAll('.post-card');

            // --- 2. Modal Functions ---
            function openModal(imgSrc, title, description, category, author, date, comments) {
                modalImage.src = imgSrc;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modalCategory.textContent = category; 
                modalAuthor.innerHTML = `<i class="fa-solid fa-user"></i> by ${author}`;
                modalDate.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${date}`;
                modalComments.innerHTML = `<i class="fa-solid fa-comment-dots"></i> ${comments} Comments`;
                postModal.style.display = 'flex'; // Show modal
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            }

            function closeModal() {
                postModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }

            // --- 3. Event Listeners ---
            
            // A. View All Button Logic
            if (viewAllButton && latestPostsGrid && archiveView) {
                viewAllButton.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    
                    // Check if the grid is currently visible (default state)
                    const isGridViewVisible = latestPostsGrid.style.display !== 'none' && 
                                              (latestPostsGrid.style.display === 'grid' || getComputedStyle(latestPostsGrid).display === 'grid');

                    if (isGridViewVisible) {
                        // Switch to Archive List View
                        latestPostsGrid.style.display = 'none'; 
                        archiveView.style.display = 'flex';      
                        viewAllButton.textContent = 'Back to Latest Posts'; 
                    } else {
                        // Switch back to Latest Posts Grid
                        latestPostsGrid.style.display = 'grid'; 
                        archiveView.style.display = 'none';      
                        viewAllButton.textContent = 'View All'; 
                    }
                });
            }

            // B. Modal Open Logic (for all post cards)
            postCards.forEach(card => {
                card.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    
                    // Get data from data- attributes
                    const imgSrc = this.dataset.img;
                    const title = this.dataset.title;
                    const description = this.dataset.description;
                    const category = this.dataset.category;
                    const author = this.dataset.author;
                    const date = this.dataset.date;
                    const comments = this.dataset.comments;
                    
                    openModal(imgSrc, title, description, category, author, date, comments);
                });
            });

            // C. Modal Close Logic
            if (closeButton) {
                closeButton.addEventListener('click', closeModal);
            }
            if (postModal) {
                postModal.addEventListener('click', function(event) {
                    if (event.target === postModal) { // Only close if clicking the backdrop
                        closeModal();
                    }
                });
            }
        });