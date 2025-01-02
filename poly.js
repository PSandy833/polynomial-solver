document.getElementById('generate').addEventListener('click', () => {
    const degree = parseInt(document.getElementById('degree').value);
    const coefficientsDiv = document.getElementById('coefficients');
  
    if (isNaN(degree) || degree < 2 || degree > 4) {
      alert('Please enter a valid degree (2-4).');
      return;
    }
  
    coefficientsDiv.innerHTML = ''; // Clear previous coefficients
    for (let i = degree; i >= 0; i--) {
      const label = document.createElement('label');
      label.textContent = `Coefficient of x^${i}:`;
      const input = document.createElement('input');
      input.type = 'number';
      input.id = `coef${i}`;
      input.required = true;
  
      coefficientsDiv.appendChild(label);
      coefficientsDiv.appendChild(input);
    }
  });
  
  document.getElementById('solver-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const degree = parseInt(document.getElementById('degree').value);
    const coefficients = [];
  
    for (let i = degree; i >= 0; i--) {
      const coef = parseFloat(document.getElementById(`coef${i}`).value);
      coefficients.push(coef);
    }
  
    const solution = solvePolynomial(coefficients);
    document.getElementById('solution').textContent = solution;
  });
  
  function solvePolynomial(coefficients) {
    const degree = coefficients.length - 1;
  
    if (degree === 2) {
      return solveQuadratic(coefficients[0], coefficients[1], coefficients[2]);
    } else if (degree <= 4) {
      return solveGeneral(coefficients);
    }
  }
  
  function solveQuadratic(a, b, c) {
    const discriminant = b ** 2 - 4 * a * c;
    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return `Roots: ${root1.toFixed(2)}, ${root2.toFixed(2)}`;
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      return `Root: ${root.toFixed(2)}`;
    } else {
      return 'No real roots.';
    }
  }
  
  function solveGeneral(coefficients) {
    const roots = [];
    let degree = coefficients.length - 1;
  
    // Remove leading zero coefficients
    while (coefficients[0] === 0 && degree > 0) {
      coefficients.shift();
      degree--;
    }
  
    try {
      const roots = math.roots(coefficients);
      return `Roots: ${roots.map(root => root.toFixed(2)).join(', ')}`;
    } catch {
      return 'Unable to compute roots for higher-degree polynomials.';
    }
  }
  