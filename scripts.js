document.querySelectorAll('.category-header').forEach((header) => {
    header.addEventListener('click', () => {
      const categoryId = header.getAttribute('data-category');
      const content = document.getElementById(`category-${categoryId}`);
  
      // Toggle hiển thị
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });



// Lấy tất cả các khối từ Blocks List
const blocks = document.querySelectorAll('.block');

// Canvas để thả khối
const canvas = document.querySelector('.code-canvas');

// Xử lý sự kiện khi bắt đầu kéo
blocks.forEach((block) => {
  block.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', block.innerText); // Lưu nội dung khối
  });
});

// Cho phép thả vào Canvas
canvas.addEventListener('dragover', (e) => {
  e.preventDefault(); // Ngăn chặn hành vi mặc định
});

// Xử lý khi thả vào Canvas
canvas.addEventListener('drop', (e) => {
  e.preventDefault();

  // Lấy nội dung khối được kéo
  const blockContent = e.dataTransfer.getData('text/plain');

  // Tạo một khối mới trong Canvas
  const newBlock = document.createElement('div');
  newBlock.innerText = blockContent;
  newBlock.classList.add('canvas-block');

  // Thêm khối vào Canvas
  canvas.appendChild(newBlock);
});


canvas.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('canvas-block')) {
      const block = e.target;
  
      let shiftX = e.clientX - block.getBoundingClientRect().left;
      let shiftY = e.clientY - block.getBoundingClientRect().top;
  
      const moveBlock = (event) => {
        block.style.left = `${event.clientX - shiftX}px`;
        block.style.top = `${event.clientY - shiftY}px`;
      };
  
      const stopMoving = () => {
        document.removeEventListener('mousemove', moveBlock);
        document.removeEventListener('mouseup', stopMoving);
      };
  
      document.addEventListener('mousemove', moveBlock);
      document.addEventListener('mouseup', stopMoving);
    }
  });
  