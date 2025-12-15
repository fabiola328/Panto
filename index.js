// Small site JS: mobile menu toggle and dynamic copyright year

document.addEventListener('DOMContentLoaded', function(){
	var navToggle = document.getElementById('nav-toggle');
	var menu = document.getElementById('primary-menu');
	if(navToggle && menu){
		navToggle.addEventListener('click', function(){
			var expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			// toggle drawer class
			menu.classList.toggle('open');
			document.body.classList.toggle('menu-open', menu.classList.contains('open'));
			// overlay control
			var overlay = document.getElementById('drawer-overlay');
			if(overlay){
				overlay.classList.toggle('open', menu.classList.contains('open'));
				overlay.setAttribute('aria-hidden', menu.classList.contains('open') ? 'false' : 'true');
			}
		});

		// close on ESC
		document.addEventListener('keydown', function(e){
			if(e.key === 'Escape' && menu.classList.contains('open')){
				menu.classList.remove('open');
				navToggle.setAttribute('aria-expanded', 'false');
				document.body.classList.remove('menu-open');
				var overlay = document.getElementById('drawer-overlay');
				if(overlay){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
			}
		});
	}

  // overlay click closes the drawer
  var overlayEl = document.getElementById('drawer-overlay');
  if(overlayEl){
    overlayEl.addEventListener('click', function(){
      if(menu && menu.classList.contains('open')){
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded','false');
        overlayEl.classList.remove('open');
        overlayEl.setAttribute('aria-hidden','true');
      }
    });
  }

	// drawer close button inside the menu
	var drawerClose = document.getElementById('drawer-close');
	if(drawerClose){
		drawerClose.addEventListener('click', function(){
			if(menu && menu.classList.contains('open')){
				menu.classList.remove('open');
				document.body.classList.remove('menu-open');
				navToggle.setAttribute('aria-expanded','false');
				if(overlayEl){overlayEl.classList.remove('open');overlayEl.setAttribute('aria-hidden','true')}
			}
		});
	}

	// Set current year in footer
	var yearEl = document.getElementById('year');
	if(yearEl) yearEl.textContent = new Date().getFullYear();
	// Products mega menu toggle (mobile-friendly)
	var productBtn = document.querySelector('.product-btn');
	var mega = document.getElementById('mega-menu');
	if(productBtn && mega){
		productBtn.addEventListener('click', function(e){
			var expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			// toggle class on parent list item for CSS display
			var parent = this.closest('.has-mega');
			if(parent){
				parent.classList.toggle('open');
				mega.setAttribute('aria-hidden', String(!parent.classList.contains('open')));
			}
		});
	}

	// Product filters: toggle active state
	var filterBtns = document.querySelectorAll('.filter-btn');
	if(filterBtns && filterBtns.length){
		filterBtns.forEach(function(btn){
			btn.addEventListener('click', function(){
				filterBtns.forEach(function(b){b.classList.remove('active');b.setAttribute('aria-selected','false')});
				this.classList.add('active');
				this.setAttribute('aria-selected','true');
				// TODO: filter products by category (data-driven) - placeholder behavior for now
			});
		});
	}

	// Add button click (small feedback)
	var addButtons = document.querySelectorAll('.add-btn');
	addButtons.forEach(function(b){
		b.addEventListener('click', function(e){
			e.preventDefault();
			b.classList.add('added');
			setTimeout(function(){b.classList.remove('added')},400);
			// placeholder: you can hook this to a cart function later
		});
	});
});

