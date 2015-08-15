# drycss

A lint tool to help point out duplicate declaration block.

## Rule

```css

.foo {
  background-color: green;
  color: black;
}

.bar {
  text-align: center;
}

@media (min-width: 768px) {

  .baz {
    background-color: red;
    color: yellow;
  }

  #qux {
    position: relative;
  }

  /* can be merged with declaration block .baz */
  .norf {
    background-color: red;
    color: yellow;
  }

  /* can be merged with declaration block #qux */
  hr {
    position: relative;
  }
}
```

## Usage

### Lint a source file

`drycss --source main.css`

or

`drycss -s main.css`
