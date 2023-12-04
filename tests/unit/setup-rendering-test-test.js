import Component from '@ember/component';
import { set } from '@ember/object';
import { setupRenderingTest } from 'ember-mocha';
import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import { click, render, settled } from '@ember/test-helpers';
import hasEmberVersion from '@ember/test-helpers/has-ember-version';

function setupRegistry(owner) {
  owner.register('component:x-foo', Component.extend());
}

describe('setupRenderingTest', function() {
  if (!hasEmberVersion(2, 4)) {
    return;
  }

  describe('pretty-color', function() {
    setupRenderingTest();
    beforeEach(function() {
      setupRegistry(this.owner);
      this.paintItBlack = () => {
        this.set('name', 'black');
      }
    });

    it('renders with color', async function() {
      this.set('name', 'green');
      await render(hbs`<PrettyColor @name={{this.name}} @paintItBlack={{this.paintItBlack}}/>`);
      expect(this.element.innerText.trim()).to.equal('Pretty Color: green');
    });

    it('renders when using standard setters', async function() {
      this.name = 'red';
      await render(hbs`<PrettyColor @name={{this.name}} @paintItBlack={{this.paintItBlack}}/>`);
      expect(this.element.innerText.trim()).to.equal('Pretty Color: red');
    });

    it('renders a second time without', async function() {
      await render(hbs`<PrettyColor @name={{this.name}} @paintItBlack={{this.paintItBlack}}/>`);
      expect(this.element.innerText.trim()).to.equal('Pretty Color:');
    });

    it('renders a third time with', async function() {
      this.set('name', 'blue');
      expect(this.name).to.equal('blue');
      await render(hbs`<PrettyColor @name={{this.name}} @paintItBlack={{this.paintItBlack}}/>`);
      expect(this.element.innerText.trim()).to.equal('Pretty Color: blue');
    });

    it('picks up changes to variables set on the context', async function() {
       this.set('name', 'pink');
       await render(hbs`<PrettyColor @name={{this.name}} @paintItBlack={{this.paintItBlack}}/>`);
       await click('button');
       expect(this.element.innerText.trim()).to.equal('Pretty Color: black');
      await settled();
       expect(this.name).to.equal('black');
       expect(this.name).to.equal('black');
     });

     it('picks up changes to variables set on the context with a standard setter', async function() {
       this.name = 'pink';
       await render(hbs`<PrettyColor @name={{this.name}} @paintItBlack={{this.paintItBlack}}/>`);
       await click('button');
       expect(this.element.innerText.trim()).to.equal('Pretty Color: black');
       expect(this.name).to.equal('black');
     });
  });

  describe('hooks API', function() {

    let hooks = setupRenderingTest();

    it('returns hooks API', function() {
      expect(hooks)
        .to.respondTo('beforeEach')
        .and.to.respondTo('afterEach');
    });
  });
});
